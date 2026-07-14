class S3UploadError(Exception):
    """Raised when uploading a file to S3 fails."""
    pass


class S3DownloadError(Exception):
    """Raised when downloading a file from S3 fails."""
    pass


class S3DeleteError(Exception):
    """Raised when deleting a file from S3 fails."""
    pass