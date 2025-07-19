import { ScorecardKind } from '@core/reviews/lib/common/reviews.constants'

type BaseScorecard = {
  kind: ScorecardKind
}

interface RestaurantScorecard extends BaseScorecard {
  kind: ScorecardKind.RESTAURANT_SCORECARD
  food_rating: 1 | 2 | 3
  ambiance_rating: 1 | 2 | 3
  service_rating: 1 | 2 | 3
  value_rating: 1 | 2 | 3
}

export type Scorecard = BaseScorecard & RestaurantScorecard
