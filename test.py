import boto3
import os

def test_s3_upload():
    # Retrieve AWS configuration from environment variables
    aws_access_key_id = os.environ.get("AWS_ACCESS_KEY_ID")
    aws_secret_access_key = os.environ.get("AWS_SECRET_ACCESS_KEY")
    aws_storage_bucket_name = os.environ.get("AWS_STORAGE_BUCKET_NAME")
    aws_s3_region_name = os.environ.get("AWS_S3_REGION_NAME", "us-east-1")  # Default fallback
    aws_s3_signature_version = os.environ.get("AWS_S3_SIGNATURE_VERSION", "s3v4")

    if not all([aws_access_key_id, aws_secret_access_key, aws_storage_bucket_name]):
        print("Error: Missing one or more required environment variables.")
        return

    try:
        # Create an S3 client
        s3 = boto3.client(
            "s3",
            aws_access_key_id=aws_access_key_id,
            aws_secret_access_key=aws_secret_access_key,
            region_name=aws_s3_region_name,
        )

        # List buckets to confirm connection
        buckets = s3.list_buckets().get("Buckets", [])
        print("Buckets in your AWS account:")
        for bucket in buckets:
            print(f"  - {bucket['Name']}")

        # Specify the local file and its S3 destination
        local_file_path = input("\nEnter the path to the local image file: ").strip()
        s3_key = f"uploads/{os.path.basename(local_file_path)}"  # Path in S3 bucket

        print(f"\nUploading {local_file_path} to s3://{aws_storage_bucket_name}/{s3_key}...")

        # Upload the file
        s3.upload_file(Filename=local_file_path, Bucket=aws_storage_bucket_name, Key=s3_key)

        print(f"Upload successful! File is now available at s3://{aws_storage_bucket_name}/{s3_key}")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_s3_upload()
