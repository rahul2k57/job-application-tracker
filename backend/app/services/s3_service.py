import boto3
from app.core import config
from botocore.config import Config
from botocore.exceptions import ClientError
from app.exceptions.s3_exceptions import S3UploadError,S3DownloadError,S3DeleteError

s3_client = boto3.client(
    "s3",
    aws_access_key_id=config.AWS_ACCESS_KEY_ID,
    aws_secret_access_key=config.AWS_SECRET_ACCESS_KEY,
    region_name=config.AWS_REGION,
    endpoint_url=f"https://s3.{config.AWS_REGION}.amazonaws.com",
    config=Config(signature_version="s3v4"),
)

def upload_file(file_contents:bytes, object_key:str)->str:
    try:
        s3_client.put_object(
            Bucket = config.AWS_BUCKET_NAME,
            Key = object_key,
            Body = file_contents,
            ContentType = "application/pdf",
        )
        return object_key
    
    except ClientError as e:
        raise S3UploadError(
            "Unable to upload file to S3."
        ) from e

def delete_file(object_key:str)->None :
    try:
        s3_client.delete_object(
            Bucket = config.AWS_BUCKET_NAME,
            Key = object_key,
        )
    except ClientError as e:
        raise S3DeleteError("Failed to delete file from s3.") from e


def generate_presigned_url(
    object_key:str,
)->str:
    try:
        url = s3_client.generate_presigned_url(
            ClientMethod = "get_object",
            Params={
                "Bucket": config.AWS_BUCKET_NAME,
                "Key": object_key,
            },
            ExpiresIn = config.PRESIGNED_URL_EXPIRE_SECONDS,
        )
        return url
    
    except ClientError as e:
        raise S3DownloadError("Failed to generate download URL.") from e