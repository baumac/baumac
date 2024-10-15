import { ScorecardKind } from '@core/ratings/lib/v1/ratings.constants'

type BaseScorecard = {
  kind: ScorecardKind
}

type CarlaRestaurantScorecard = {
  kind: ScorecardKind.CARLA_RESTAURANT_SCORECARD
  food_rating: 1 | 2 | 3
  ambiance_rating: 1 | 2 | 3
  service_rating: 1 | 2 | 3
  value_rating: 1 | 2 | 3
}

export type Scorecard = BaseScorecard & CarlaRestaurantScorecard
