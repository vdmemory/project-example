#!/bin/bash

StartClient ()
{
  yarn start:client --prod
}

StartAgency()
{
  yarn start:agency --prod
}

case $1 in
    start_client)
        StartClient
        ;;

    start_agency)
        StartAgency
        ;;

    *)
        echo $"Usage: $0 {start_client|start_agency}"
        exit 1

esac
