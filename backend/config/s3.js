const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");

require("dotenv").config();

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// upload file to s3
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise();
}

exports.uploadFile = uploadFile;

// download file from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.getObject(downloadParams).createReadStream();
}

exports.getFileStream = getFileStream;

function deleteFileStream(key) {
  // prevent deleting default image
  switch (key) {
    case "default-album.jpg":
    case "default-playlist.jpg":
    case "default-profile.png":
      return;
    default:
  }

  s3.deleteObject(
    {
      Bucket: bucketName,
      Key: key,
    },
    function (deleteErr, data) {
      if (deleteErr) {
        console.log("Error: " + deleteErr);
      } else {
        console.log("Successfully deleted the item");
      }
    }
  );
}
exports.deleteFileStream = deleteFileStream;
