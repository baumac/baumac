package main

import (
	"2025/utils"
	"fmt"
	"os"
	"sort"
	"strings"
)

type Range struct {
	Start int
	End   int
}

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
	lines := strings.Split(input, "\n")

	freshIngredients := 0
	var ranges []Range
	var ids []int
	i := 0

	for lines[i] != "" {
		parsed := strings.Split(lines[i], "-")
		start := utils.ParseIntOrPanic(parsed[0])
		end := utils.ParseIntOrPanic(parsed[1])
		ranges = append(ranges, Range{start, end})
		i++
	}

	// skip the empty line separator
	i++

	for i < len(lines)-1 {
		ids = append(ids, utils.ParseIntOrPanic(lines[i]))
		i++
	}

	for _, id := range ids {
		if isFresh(ranges, id) {
			freshIngredients++
		}
	}

	return freshIngredients
}

func isFresh(ranges []Range, id int) bool {
	for _, r := range ranges {
		if id >= r.Start && id <= r.End {
			return true
		}
	}
	return false
}

func Part2(input string) int {
	lines := strings.Split(input, "\n")

	freshIngredients := 0
	var ranges []Range
	i := 0

	for lines[i] != "" {
		parsed := strings.Split(lines[i], "-")
		start := utils.ParseIntOrPanic(parsed[0])
		end := utils.ParseIntOrPanic(parsed[1])
		ranges = append(ranges, Range{start, end})
		i++
	}

	mergedRanges := mergeRanges(ranges)

	for _, item := range mergedRanges {
		freshIngredients += item.End - item.Start + 1
	}

	return freshIngredients
}

func mergeRanges(ranges []Range) []Range {

	// sort the ranges by start from smallest to largest
	sort.Slice(ranges, func(i, j int) bool {
		return ranges[i].Start < ranges[j].Start
	})

	//var mergedRanges []Range

	// index of the Work in Progress range
	wipIdx := 0

	for i := 1; i < len(ranges); i++ {
		wipRange := ranges[wipIdx]

		// if the WIP contains the current or if they touch, merge them inside the WIP
		if wipRange.overlaps(ranges[i]) || wipRange.contains(ranges[i]) {
			ranges[wipIdx] = wipRange.merge(ranges[i])
		} else {
			// disjoint ranges
			// freeze the current WIP by focusing on the next one
			// that is the current range
			wipIdx++
			ranges[wipIdx] = ranges[i]
		}

	}

	ranges = ranges[:wipIdx+1]

	return ranges
}

func (r Range) overlaps(r2 Range) bool {
	return r.Start <= r2.Start && r.End >= r2.Start
}

func (r Range) contains(r2 Range) bool {
	return r.Start <= r2.Start && r.End >= r2.End
}

func (r Range) merge(r2 Range) Range {
	var mergedStart int

	if r.Start < r2.Start {
		mergedStart = r.Start
	} else {
		mergedStart = r2.Start
	}

	var mergedEnd int
	if r.End > r2.End {
		mergedEnd = r.End
	} else {
		mergedEnd = r2.End
	}

	return Range{mergedStart, mergedEnd}
}
