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
	// Sum of all the times the dial is left pointing at 0 after any rotation in the sequence
	dialPointsAt0Sum := 0

	// The dial starts by pointing at 50
	dialPointsAt := 50

	lines := strings.Split(input, "\n")

	for _, line := range lines {

		// Skip the last line
		if line == "" {
			continue
		}

		// Parse Line Input
		direction := string(line[0])
		distance := utils.ParseIntOrPanic(string(line[1:]))

		// Normalize distance for when it is greater than the dial's range of 99
		if distance >= 100 {
			distance = distance % 100
		}

		// Move the dial
		if direction == "L" {
			dialPointsAt -= distance
		} else if direction == "R" {
			dialPointsAt += distance
		} else {
			panic("invalid direction")
		}

		// Adjust for dial being circular
		if dialPointsAt < 0 {
			dialPointsAt += 100
		}
		if dialPointsAt > 99 {
			dialPointsAt -= 100
		}

		// Check if the dial points to 0
		if dialPointsAt == 0 {
			dialPointsAt0Sum += 1
		}
	}

	return dialPointsAt0Sum
}

func Part2(input string) int {
	// Sum of all the times the dial is left pointing at 0 after any rotation in the sequence
	dialPointsAt0Sum := 0

	// The dial starts by pointing at 50
	dialPointsAt := 50

	fmt.Printf("The dial starts by pointing at %d\n", dialPointsAt)

	lines := strings.Split(input, "\n")

	for _, line := range lines {

		dialStartsAt := dialPointsAt
		// Skip the last line
		if line == "" {
			continue
		}

		// Parse Line Input
		direction := string(line[0])
		distance := utils.ParseIntOrPanic(string(line[1:]))

		//fmt.Printf("The dial is rotated %s ", line)

		// Normalize distance for when it is greater than the dial's range of 99
		if distance >= 100 {
			numberOfTimesDialPasses0 := distance / 100
			distance = distance % 100
			dialPointsAt0Sum += numberOfTimesDialPasses0
		}

		// Move the dial
		if direction == "L" {
			dialPointsAt -= distance
		} else if direction == "R" {
			dialPointsAt += distance
		} else {
			panic("invalid direction")
		}

		// Adjust for dial being circular
		if dialPointsAt == 0 {
			dialPointsAt0Sum += 1
		} else if dialPointsAt < 0 {
			dialPointsAt += 100
			// handle the case where the dial starts at 0 and therefore never passes 0
			if dialStartsAt != 0 {
				dialPointsAt0Sum += 1
			}
		} else if dialPointsAt > 99 {
			dialPointsAt -= 100
			dialPointsAt0Sum += 1
		}

		//fmt.Printf("to point at %d. The number of times that the dial has pointed at 0 is %d. \n", dialPointsAt, dialPointsAt0Sum)
	}

	return dialPointsAt0Sum
}
