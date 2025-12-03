package main

import (
	"testing"
)

func TestPart1_1(t *testing.T) {
	input := "987654321111111\n811111111111119\n234234234234278\n818181911112111\n"

	want := 357
	answer := Part1(input)
	if want != answer {
		t.Fatalf(`Part1() failed. Wanted %d received %d`, want, answer)
	}
}

func TestPart2_1(t *testing.T) {
	input := "987654321111111\n811111111111119\n234234234234278\n818181911112111\n"

	want := 3121910778619
	answer := Part2(input)
	if want != answer {
		t.Fatalf(`Part1() failed. Wanted %d received %d`, want, answer)
	}
}
