#!/bin/bash


# Get runner ID
RUNNER_ID=$(curl --header "PRIVATE-TOKEN:$GITLAB_TOKEN" "https://gitlab.com/api/v4/projects/$CI_PROJECT_ID/runners?tag_list=$AUTOTESTS_RUNNER_TAG" | jq '.[0] | .id')

# Get runner pause status
RUNNER_PAUSED=$(curl --header "PRIVATE-TOKEN:$GITLAB_TOKEN" "https://gitlab.com/api/v4/runners/$RUNNER_ID" | jq '.paused')

# Get runner jobs status
JOBS_STATUS=$(curl --header "PRIVATE-TOKEN:$GITLAB_TOKEN" "https://gitlab.com/api/v4/runners/$RUNNER_ID/jobs?status=running" | jq '.[0] | .status')

# Get AWS EC2 instance status
EC2_STATUS=$(aws ec2 describe-instance-status --instance-ids $AUTOTESTS_AWS_RUNNER_ID --region $AWS_DEFAULT_REGION  --include-all-instances | jq '.InstanceStatuses[0].InstanceState.Name')


StartingRunner ()
{
    echo "Runner Paused:$RUNNER_PAUSED"
    echo "EC2 Instance:$EC2_STATUS"
    if [ $RUNNER_PAUSED == false ] && [ $EC2_STATUS == '"running"' ]; then
        echo "Runner is already running";
        exit 0
    else
        echo "Starting runner";
        aws --version;
        aws ec2 start-instances --instance-ids $AUTOTESTS_AWS_RUNNER_ID --region $AWS_DEFAULT_REGION

        echo "Remove status "paused""
        curl --request PUT --header "PRIVATE-TOKEN:$GITLAB_TOKEN" --form "paused=false" "https://gitlab.com/api/v4/runners/$RUNNER_ID"
    fi
}

StoppingRunner ()
{
    echo "Runner Job Status:$JOBS_STATUS"
    echo "Runner Paused:$RUNNER_PAUSED"
    echo "EC2 Instance:$EC2_STATUS"
    if [ $JOBS_STATUS == '"running"' ]; then
        echo "The runner cannot be stopped because it has active jobs";
        exit 0
    elif [ $RUNNER_PAUSED == true ] && [ $EC2_STATUS == '"stopped"' ]; then
        echo "Runner is already stopped";
        exit 0
    else
        echo "Stopping runner";
        aws --version;
        aws ec2 stop-instances --instance-ids $AUTOTESTS_AWS_RUNNER_ID --region $AWS_DEFAULT_REGION

        echo "Set status "paused" for runner"
        curl --request PUT --header "PRIVATE-TOKEN:$GITLAB_TOKEN" --form "paused=true" "https://gitlab.com/api/v4/runners/$RUNNER_ID"
    fi
}

case $1 in
    starting_runner)
        StartingRunner
        ;;

    stopping_runner)
        StoppingRunner
        ;;

    *)
        echo $"Usage: $0 {starting_runner|stopping_runner}"
        exit 1
esac