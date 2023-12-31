#!/bin/bash

# Function to generate a random IPv4 address
generate_ipv4() {
    echo "$((RANDOM % 256)).$((RANDOM % 256)).$((RANDOM % 256)).$((RANDOM % 256))"
}

# Function to generate a random IPv6 address
generate_ipv6() {
    printf "2001:%04x:%04x:%04x:%04x:%04x:%04x:%04x\n" \
    $((RANDOM % 65536)) $((RANDOM % 65536)) $((RANDOM % 65536)) $((RANDOM % 65536)) \
    $((RANDOM % 65536)) $((RANDOM % 65536)) $((RANDOM % 65536)) $((RANDOM % 65536))
}

# Function to generate random sleep time between 10ms and 100ms
generate_sleep_time() {
    echo "$(jot -r 1 5 10)"
}

# Function to print IPs in five columns
print_ips() {
    printf "%-20s %-20s %-20s %-20s %-20s\n" "${ips[@]}"
}

# Function to display the progress bar
progress_bar() {
    local progress=$1
    local width=50
    local num_chars=$((progress * width / 100))
    local bar=$(printf "%-${width}s" "")
    printf "\r[%-${width}s] %d%%" "${bar// /#}" "$progress"
}
# Ask the user to choose an option
echo "Choose an option:"
echo "1. IP INSPECTOR"
echo "2. BACKUP"
read option

case $option in
    1)
        echo "Reroot option selected."
        # Add your reroot logic here if needed
        ;;
    2)
        echo "Backup option selected."
        # Add your backup logic here if needed
        ;;
    *)
        echo "Invalid option."
        exit 1
        ;;
esac

# Main loop to print 400,000 random IPs
declare -a ips
total_ips=400
progress_step_10=$((total_ips / 10))
progress_step_50=$((total_ips / 2))
progress_step_70=$((total_ips * 7 / 10))
progress_step_90=$((total_ips * 9 / 10))
current_progress=0

# Store the progress bar in a variable to display at the bottom
progress_line=""

for ((i = 1; i <= total_ips; i++)); do
    # Generate random IP type (IPv4 or IPv6)
    ip_type=$((RANDOM % 2))

    if [ $ip_type -eq 0 ]; then
        ips[0]=$(generate_ipv4)
    else
        ips[0]=$(generate_ipv6)
    fi

    # Generate random sleep time in milliseconds
    sleep_time=$(generate_sleep_time)

    # Convert milliseconds to seconds for the sleep command
    sleep_seconds=$(bc <<<"scale=3; $sleep_time / 1000")

    # Print IPs in five columns
    if ((i % 5 == 0)); then
        ips[4]=${ips[0]}
        print_ips
        unset ips
    else
        ips[$((i % 5))]=${ips[0]}
    fi

    # Sleep
    sleep $sleep_seconds

    # Update progress bar
    current_progress=$((i * 100 / total_ips))
    if [ $i -eq $progress_step_10 ] || [ $i -eq $progress_step_50 ] || [ $i -eq $progress_step_70 ] || [ $i -eq $progress_step_90 ]; then
        progress_bar $current_progress
        progress_line="\r[%-${width}s] %d%%" "${bar// /#}" "$current_progress"
        sleep 0.5
    fi
done

# Display 100% progress at the bottom
printf "%s\n" "$progress_line"
