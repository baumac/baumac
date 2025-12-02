package main

import (
	"2025/utils"
	"fmt"
	"os"
	"strconv"
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
	// Sum of all the invalid IDs
	invalidIdsSum := 0

	idRanges := strings.Split(input, ",")

	for _, idRange := range idRanges {

		// Skip the last line
		if idRange == "" {
			continue
		}

		parsedInput := strings.Split(strings.TrimSpace(idRange), "-")
		// Parse Line Input
		rangeStart := utils.ParseIntOrPanic(parsedInput[0])
		rangeEnd := utils.ParseIntOrPanic(parsedInput[1])

		//fmt.Printf("ID Range: %s. Start: %d, End: %d\n", idRange, rangeStart, rangeEnd)

		for i := rangeStart; i <= rangeEnd; i++ {
			// check if the id is invalid
			if composedOfRepeatedSequenceTwice(i) {
				invalidIdsSum += i
			}
		}
	}

	return invalidIdsSum
}

func Part2(input string) int {
	// Sum of all the invalid IDs
	invalidIdsSum := 0

	idRanges := strings.Split(input, ",")

	for _, idRange := range idRanges {

		// Skip the last line
		if idRange == "" {
			continue
		}

		parsedInput := strings.Split(strings.TrimSpace(idRange), "-")
		// Parse Line Input
		rangeStart := utils.ParseIntOrPanic(parsedInput[0])
		rangeEnd := utils.ParseIntOrPanic(parsedInput[1])

		//fmt.Printf("ID Range: %s. Start: %d, End: %d\n", idRange, rangeStart, rangeEnd)

		for i := rangeStart; i <= rangeEnd; i++ {
			// check if the id is invalid
			if composedOfRepeatedSequence(i) {
				invalidIdsSum += i
			}
		}
	}

	return invalidIdsSum
}

func composedOfRepeatedSequenceTwice(input int) bool {
	s := strconv.Itoa(input)

	// If the string length is odd, it cannot contain the same id twice
	if len(s)%2 != 0 {
		return false
	}

	// Find the middle index
	middleIndex := len(s) / 2

	// Find the first half of the string
	firstHalf := s[:middleIndex]

	// Find the second half of the string
	secondHalf := s[middleIndex:]

	return firstHalf == secondHalf
}

func composedOfRepeatedSequence(input int) bool {
	s := strconv.Itoa(input)
	n := len(s)
	// The repeated substring can be at most half the length of the string
	for l := 1; l <= n/2; l++ {
		// Optimization: Length of s must be divisible by substring length
		if n%l == 0 {
			sub := s[:l]
			repeats := n / l
			if strings.Repeat(sub, repeats) == s {
				return true
			}
		}
	}
	return false
}
