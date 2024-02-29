import {
    CodeGuruReviewerClient,
    CreateCodeReviewCommand
} from "@aws-sdk/client-codeguru-reviewer"

const config = {
    region: "REGION",
    credentials: {
        accessKeyId: "ACCESS_KEY_ID",
        secretAccessKey: "SECRET_ACCESS_KEY"
    }
};

const client = new CodeGuruReviewerClient(config);

const input = { // CreateCodeReviewRequest
    Name: "Name you want to keep for the code review ", // required
    RepositoryAssociationArn: "RETURNED BY ASSOCIATE REPOSITORY COMMAND", // required
    "Type": {
        "RepositoryAnalysis": {
                "S3BucketRepository": {
                    "Details": {
                        "BucketName": "NAME OF S3 BUCKET",
                        "CodeArtifacts": {
                        //     "BuildArtifactsObjectKey": "string", //Still not sure about its nature, think its an object key for build file?
                        "SourceCodeArtifactsObjectKey": "samplehash.py"
                        }
                    },
                    "Name": "samplehash.py"
                }
            }
        }
    };

const command = new CreateCodeReviewCommand(input);
const response = await client.send(command);

