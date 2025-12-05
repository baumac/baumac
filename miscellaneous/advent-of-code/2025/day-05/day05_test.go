package main

import (
	"testing"
)

func TestPart1_1(t *testing.T) {
	input := "3-5\n10-14\n16-20\n12-18\n\n1\n5\n8\n11\n17\n32"

	want := 3
	answer := Part1(input)
	if want != answer {
		t.Fatalf(`Part1() failed. Wanted %d received %d`, want, answer)
	}
}

func TestPart2_1(t *testing.T) {
	input := "3-5\n10-14\n16-20\n12-18\n\n1\n5\n8\n11\n17\n32"

	want := 14
	answer := Part2(input)
	if want != answer {
		t.Fatalf(`Part1() failed. Wanted %d received %d`, want, answer)
	}
}
