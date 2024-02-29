import {
    CodeGuruReviewerClient,
    AssociateRepositoryCommand
} from "@aws-sdk/client-codeguru-reviewer"

const config = {
    region: "REGION",
    credentials: {
        accessKeyId: "ACCESS_KEY_ID",
        secretAccessKey: "SECRET_ACCESS_KEY"
    }
};

const client = new CodeGuruReviewerClient(config);

const input = { // AssociateRepositoryRequest
    Repository: {
        S3Bucket: { // S3Repository
            BucketName: "BUCKET NAME", // required
            Name: "REPO NAME - IN OUR CASE IT CAN BE FILE NAME", // required
        },
    },
};

const command = new AssociateRepositoryCommand(input);
const response = await client.send(command);