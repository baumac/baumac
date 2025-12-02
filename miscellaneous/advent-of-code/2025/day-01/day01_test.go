package main

import (
	"testing"
)

func TestPart1_1(t *testing.T) {
	input := "L68\nL30\nR48\nL5\nR60\nL55\nL1\nL99\nR14\nL82"

	want := 3
	answer := Part1(input)
	if want != answer {
		t.Fatalf(`Part1() failed. Wanted %d received %d`, want, answer)
	}
}

func TestPart1_2(t *testing.T) {
	input := "R49\nR1\nL99\n"

	want := 1
	answer := Part1(input)
	if want != answer {
		t.Fatalf(`Part1() failed. Wanted %d received %d`, want, answer)
	}
}

func TestPart1_3(t *testing.T) {
	input := "L39\nR8\nL19\n"

	want := 1
	answer := Part1(input)
	if want != answer {
		t.Fatalf(`Part1() failed. Wanted %d received %d`, want, answer)
	}
}

func TestPart1_4(t *testing.T) {
	input := "L50\nL1\nR1\n"

	want := 2
	answer := Part1(input)
	if want != answer {
		t.Fatalf(`Part1() failed. Wanted %d received %d`, want, answer)
	}
}

func TestPart1_5(t *testing.T) {
	input := "L45\nL10\nR5\nR200\n"

	want := 2
	answer := Part1(input)
	if want != answer {
		t.Fatalf(`Part1() failed. Wanted %d received %d`, want, answer)
	}
}

func TestPart2_1(t *testing.T) {
	input := "L68\nL30\nR48\nL5\nR60\nL55\nL1\nL99\nR14\nL82"

	want := 6
	answer := Part2(input)
	if want != answer {
		t.Fatalf(`Part2() failed. Wanted %d received %d`, want, answer)
	}
}

func TestPart2_2(t *testing.T) {
	input := "R1000"

	want := 10
	answer := Part2(input)
	if want != answer {
		t.Fatalf(`Part2() failed. Wanted %d received %d`, want, answer)
	}
}
