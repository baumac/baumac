import { SubjectKind } from '@core/subjects/lib/v1/subjects.constants'

type BaseSubjectMetadata = {
  kind: SubjectKind
  note: string
}

type RestaurantMetadata = {
  kind: SubjectKind.RESTAURANT
  location: string
  price: string
}

export type SubjectMetadata = BaseSubjectMetadata & RestaurantMetadata
