import { ImageManipulator } from 'expo';

const blurImageBorder = async (imageUri, borderWidth, blurRadius) => {
  // 이미지 데이터를 가져옵니다.
  const image = await ImageManipulator.manipulateAsync(
    imageUri,
    [{ resize: { width: 200 } }],
    { format: 'jpeg' }
  );

  // 이미지 경계에 흐림 효과를 적용합니다.
  const manipulatedImage = await ImageManipulator.manipulateAsync(
    image.uri,
    [
      {
        crop: {
          originX: borderWidth,
          originY: borderWidth,
          width: image.width - 2 * borderWidth,
          height: image.height - 2 * borderWidth,
        },
      },
      {
        blur: blurRadius,
      },
    ],
    { format: 'jpeg' }
  );

  // 조작된 이미지를 반환합니다.
  return manipulatedImage.uri;
};

export default blurImageBorder