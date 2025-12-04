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
	lines := strings.Split(input, "\n")

	numRows := len(lines)
	accessibleRolls := 0

	for row, currentLine := range lines {
		numCols := len(currentLine)

		for col := 0; col < numCols; col++ {
			if currentLine[col] != '@' {
				continue
			}

			adjacentCount := 0

			for dr := -1; dr <= 1; dr++ {
				for dc := -1; dc <= 1; dc++ {
					if dr == 0 && dc == 0 {
						continue
					}

					neighborRow := row + dr
					neighborCol := col + dc

					if neighborRow < 0 || neighborRow >= numRows {
						continue
					}

					neighborLine := lines[neighborRow]

					if neighborCol < 0 || neighborCol >= len(neighborLine) {
						continue
					}

					if neighborLine[neighborCol] == '@' {
						adjacentCount++
					}
				}
			}

			if adjacentCount < 4 {
				accessibleRolls++
			}
		}
	}

	return accessibleRolls
}

func Part2(input string) int {
	lines := strings.Split(input, "\n")

	grid := make([][]rune, len(lines))
	for i, line := range lines {
		grid[i] = []rune(line)
	}

	numRows := len(grid)
	removedRolls := 0

	for {
		var cellsToRemove []struct{ row, col int }

		for row := 0; row < numRows; row++ {
			currentLine := grid[row]
			width := len(currentLine)

			for col := 0; col < width; col++ {
				if currentLine[col] != '@' {
					continue
				}

				adjacentCount := 0

				for dr := -1; dr <= 1; dr++ {
					for dc := -1; dc <= 1; dc++ {
						if dr == 0 && dc == 0 {
							continue
						}

						neighborRow := row + dr
						neighborCol := col + dc

						if neighborRow < 0 || neighborRow >= numRows {
							continue
						}

						neighborLine := grid[neighborRow]

						if neighborCol < 0 || neighborCol >= len(neighborLine) {
							continue
						}

						if neighborLine[neighborCol] == '@' {
							adjacentCount++
						}
					}
				}

				if adjacentCount < 4 {
					cellsToRemove = append(cellsToRemove, struct{ row, col int }{row, col})
				}
			}
		}

		if len(cellsToRemove) == 0 {
			break
		}

		for _, cell := range cellsToRemove {
			grid[cell.row][cell.col] = '.'
		}

		removedRolls += len(cellsToRemove)
	}

	return removedRolls
}
