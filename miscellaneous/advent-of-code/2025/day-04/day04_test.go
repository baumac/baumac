package main

import (
	"testing"
)

func TestPart1_1(t *testing.T) {
	input := "..@@.@@@@.\n@@@.@.@.@@\n@@@@@.@.@@\n@.@@@@..@.\n@@.@@@@.@@\n.@@@@@@@.@\n.@.@.@.@@@\n@.@@@.@@@@\n.@@@@@@@@.\n@.@.@@@.@."

	want := 13
	answer := Part1(input)
	if want != answer {
		t.Fatalf(`Part1() failed. Wanted %d received %d`, want, answer)
	}
}

func TestPart2_1(t *testing.T) {
	input := "..@@.@@@@.\n@@@.@.@.@@\n@@@@@.@.@@\n@.@@@@..@.\n@@.@@@@.@@\n.@@@@@@@.@\n.@.@.@.@@@\n@.@@@.@@@@\n.@@@@@@@@.\n@.@.@@@.@."

	want := 43
	answer := Part2(input)
	if want != answer {
		t.Fatalf(`Part2() failed. Wanted %d received %d`, want, answer)
	}
}
