import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

const ImageLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality: number;
}) => `${src}?w=${width}&q=${quality || 75}`;

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
};

const thumbStyle = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const DropzoneWithPreview = () => {
  const [file, setFile] = useState<any>();
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      if (!file) {
        setFile({
          ...acceptedFiles[0],
          preview: URL.createObjectURL(acceptedFiles[0]),
        });
      }
    },
  });

  const Thumbnail = () => (
    <div style={thumbStyle as any} key={file?.name}>
      <div style={thumbInner}>
        <Image
          unoptimized
          loader={ImageLoader as any}
          src={file?.preview}
          alt={file?.name as string}
          width={200}
          height={300}
          layout="responsive"
        />
      </div>
    </div>
  );

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    URL.revokeObjectURL(file?.preview);
  }, [file]);

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag and drop some files here, or click to select files</p>
        {JSON.stringify(file, null, 4)}
      </div>
      <aside style={thumbsContainer as any}>
        {file && file.preview && <Thumbnail />}
      </aside>
    </section>
  );
};

export default DropzoneWithPreview;
