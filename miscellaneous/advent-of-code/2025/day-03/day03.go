package main

import (
	"2025/utils"
	"fmt"
	"os"
	"strings"
)

func main() {
	//Open input file
	inputFile, err := os.Open("input.txt")
	if err != nil {
		panic(err)
	}

	// Close Input File
	defer func() {
		err = inputFile.Close()
		if err != nil {
			panic(err)
		}
	}()

	input := utils.ReadInputFile(inputFile)

	// Print the answer
	fmt.Println("Part 1 answer: ", Part1(input))
	fmt.Println("Part 2 answer: ", Part2(input))
}
func Part1(input string) int {
	// Sum of the joltage of each line
	totalJoltage := 0

	lines := strings.Split(input, "\n")

	for _, line := range lines {

		// Skip the last line
		if line == "" {
			continue
		}

		var batteries []int
		// Convert each character in the line to an integer
		for _, char := range line {
			// Subtracting the rune '0' converts the ASCII character to its integer value
			batteries = append(batteries, int(char-'0'))
		}

		lineJoltage := findMaxJoltage(batteries, 2)
		totalJoltage += lineJoltage

		//fmt.Printf("Line Joltage is: %d. Total Joltage is: %d\n", lineJoltage, totalJoltage)
	}

	return totalJoltage
}

func Part2(input string) int {
	// Sum of the joltage of each line
	totalJoltage := 0

	lines := strings.Split(input, "\n")

	for _, line := range lines {

		// Skip the last line
		if line == "" {
			continue
		}

		var batteries []int
		// Convert each character in the line to an integer
		for _, char := range line {
			// Subtracting the rune '0' converts the ASCII character to its integer value
			batteries = append(batteries, int(char-'0'))
		}

		lineJoltage := findMaxJoltage(batteries, 12)
		totalJoltage += lineJoltage

		//fmt.Printf("Line Joltage is: %d. Total Joltage is: %d\n", lineJoltage, totalJoltage)
	}

	return totalJoltage
}

func findMaxJoltage(batteries []int, numBatteries int) int {
	maxJoltage := 0

	for remainingDigits := numBatteries - 1; remainingDigits >= 0; remainingDigits-- {

		var remainingBatteries []int
		if remainingDigits > 0 {
			remainingBatteries = batteries[:len(batteries)-remainingDigits]
		} else {
			remainingBatteries = batteries
		}

		// Find the max value in remainingBatteries
		maxBattery := remainingBatteries[0]
		bestIndex := 0
		for i := 1; i < len(remainingBatteries); i++ {
			if remainingBatteries[i] > maxBattery {
				maxBattery = remainingBatteries[i]
				bestIndex = i
			}
		}
		maxJoltage = maxJoltage*10 + maxBattery

		// Remove everything up to and including maxBattery
		batteries = batteries[bestIndex+1:]
	}

	return maxJoltage
}
