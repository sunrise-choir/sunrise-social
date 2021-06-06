// with help from https://codesandbox.io/s/y09komm059

import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react'
import { getOrientation, Orientation } from 'get-orientation/browser'
import React, { useCallback, useState } from 'react'
import Cropper from 'react-easy-crop'
import { Area } from 'react-easy-crop/types'

const ORIENTATION_TO_ANGLE: Partial<Record<Orientation, number>> = {
  [Orientation.BOTTOM_RIGHT]: 180,
  [Orientation.RIGHT_TOP]: 90,
  [Orientation.LEFT_BOTTOM]: -90,
}

interface EditProfileImageProps {
  feedId: string
}

export default function EditProfileImage(props: EditProfileImageProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    if (imageSrc == null || croppedAreaPixels == null) return
    try {
      const croppedImage = await getCroppedImage(
        imageSrc,
        croppedAreaPixels,
        rotation,
      )
      console.log('donee', { croppedImage })
      setCroppedImage(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [imageSrc, croppedAreaPixels, rotation])

  const onFileChange = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (ev.target.files && ev.target.files.length > 0) {
      const file = ev.target.files[0]
      let imageDataUrl = await readFile(file)

      // apply rotation if needed
      const orientation = await getOrientation(file)
      const rotation = ORIENTATION_TO_ANGLE[orientation]
      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotation)
      }

      setImageSrc(imageDataUrl)
    }
  }

  return (
    <div>
      {imageSrc ? (
        <Container>
          <Box position="relative" width="full" height={32}>
            <Cropper
              image={imageSrc}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </Box>
          <Box
            padding={4}
            display="flex"
            flexDirection="column"
            alignItems="stretch"
          >
            <FormControl>
              <FormLabel>Zoom</FormLabel>
              <Slider
                aria-label="Zoom"
                defaultValue={zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={setZoom}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </FormControl>
            <FormControl>
              <FormLabel>Rotation</FormLabel>
              <Slider
                aria-label="Rotation"
                defaultValue={rotation}
                min={0}
                max={360}
                step={1}
                onChange={setRotation}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </FormControl>
            <Button onClick={showCroppedImage}>Show Result</Button>
          </Box>
        </Container>
      ) : (
        <input type="file" onChange={onFileChange} accept="image/*" />
      )}
      {croppedImage != null && <img src={croppedImage} />}
    </div>
  )
}

function readFile(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener(
      'load',
      () => resolve(reader.result as string),
      false,
    )
    reader.readAsDataURL(file)
  })
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
    image.src = url
  })
}

function getRadianAngle(degreeValue: number): number {
  return (degreeValue * Math.PI) / 180
}

// adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
async function getCroppedImage(
  imageSrc: string,
  pixelCrop: Area,
  rotation: number = 0,
): Promise<string> {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (ctx == null) throw new Error('failed to get canvas context')

  const maxSize = Math.max(image.width, image.height)
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2))

  // set each dimensions to double largest dimension to allow for a safe area for the
  // image to rotate in without being clipped by canvas context
  canvas.width = safeArea
  canvas.height = safeArea

  // translate canvas context to a central location on image to allow rotating around the center.
  ctx.translate(safeArea / 2, safeArea / 2)
  ctx.rotate(getRadianAngle(rotation))
  ctx.translate(-safeArea / 2, -safeArea / 2)

  // draw rotated image and store data.
  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5,
  )
  const data = ctx.getImageData(0, 0, safeArea, safeArea)

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  // paste generated rotate image with correct offsets for x,y crop values.
  ctx.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y),
  )

  // As Base64 string
  // return canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve) => {
    canvas.toBlob((file) => {
      resolve(URL.createObjectURL(file))
    }, 'image/png')
  })
}

async function getRotatedImage(
  imageSrc: string,
  rotation: number = 0,
): Promise<string> {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (ctx == null) throw new Error('failed to get canvas context')

  const orientationChanged =
    rotation === 90 || rotation === -90 || rotation === 270 || rotation === -270
  if (orientationChanged) {
    canvas.width = image.height
    canvas.height = image.width
  } else {
    canvas.width = image.width
    canvas.height = image.height
  }

  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.rotate((rotation * Math.PI) / 180)
  ctx.drawImage(image, -image.width / 2, -image.height / 2)

  return new Promise((resolve) => {
    canvas.toBlob((file) => {
      resolve(URL.createObjectURL(file))
    }, 'image/png')
  })
}

/*
// https://gist.github.com/Sqvall/23043a12a7fabf0f055198cb6ec39531

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  InputGroup,
} from '@chakra-ui/react'
import React, { ReactNode, useRef } from 'react'
import { useForm, UseFormRegisterReturn } from 'react-hook-form'
import { FiFile } from 'react-icons/fi'

type FormValues = {
  image: File
}

interface EditProfileImageProps {
  feedId: string
}

export default function EditProfileImage(props: EditProfileImageProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>()
  const onSubmit = handleSubmit((data) => console.log('On Submit: ', data))

  const validateFile = (value: FileList) => {
    console.log('value', value)
    if (value.length < 1) {
      return 'File is required'
    }
    if (value.length > 1) {
      return 'Too many files'
    }
    for (const file of Array.from(value)) {
      const fsMb = file.size / (1024 * 1024)
      const MAX_FILE_SIZE = 5
      if (fsMb > MAX_FILE_SIZE) {
        return 'Max file size 5mb'
      }
    }
    return true
  }

  return (
    <form onSubmit={onSubmit}>
      <FormControl isInvalid={!!errors.image} isRequired>
        <FormLabel>{'File input'}</FormLabel>

        <FileUpload
          accept={'image/*'}
          register={register('image', { validate: validateFile })}
        >
          <Button leftIcon={<Icon as={FiFile} />}>Upload</Button>
        </FileUpload>

        <FormErrorMessage>
          {errors.image && errors?.image.message}
        </FormErrorMessage>
      </FormControl>

      <Button isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  )
}

type FileUploadProps = {
  register: UseFormRegisterReturn
  accept?: string
  multiple?: boolean
  children?: ReactNode
}

const FileUpload = (props: FileUploadProps) => {
  const { register, accept, multiple = false, children } = props
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { ref, ...rest } = register as {
    ref: (instance: HTMLInputElement | null) => void
  }

  const handleClick = () => inputRef.current?.click()

  return (
    <InputGroup onClick={handleClick}>
      <input
        type={'file'}
        multiple={multiple}
        hidden
        accept={accept}
        {...rest}
        ref={(e) => {
          ref(e)
          inputRef.current = e
        }}
      />
      <>{children}</>
    </InputGroup>
  )
}
*/
