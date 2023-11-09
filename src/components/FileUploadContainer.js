import { useField } from "formik";

const FileUpload = ({
  fileRef,
  setThumbnail,
  setImage,
  formikProps,
  ...props
}) => {
  // eslint-disable-next-line no-unused-vars
  const [field, meta] = useField(props);

  const handleFileUpload = (event) => {
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      setThumbnail(reader.result);
    };
    if (file) reader.readAsDataURL(file);
  };

  return (
    <>
      <input
        ref={fileRef}
        id="dropzone-file"
        multiple={true}
        type="file"
        accept="image/png, image/jpg, image/jpeg"
        {...field}
        {...props}
        onChange={(e) => {
          setImage(e.target.files[0]);
          handleFileUpload(e);
          formikProps.handleChange(e);
        }}
      />
      <p className="text-red-600">{meta.error}</p>
    </>
  );
};

const FileUploadContainer = ({
  profileRef,
  thumbnail,
  setThumbnail,
  setImage,
  formikProps,
}) => {
  return (
    <>
      {thumbnail ? (
        <img
          src={thumbnail}
          alt="Uploaded"
          className="w-48 h-48 rounded-full"
        />
      ) : (
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            className="bi bi-camera"
            viewBox="0 0 16 16"
          >
            <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
            <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
          </svg>
        </div>
      )}
      <FileUpload
        fileRef={profileRef}
        className="hidden"
        name="profile"
        setThumbnail={setThumbnail}
        setImage={setImage}
        formikProps={formikProps}
      />
    </>
  );
};

export default FileUploadContainer;
