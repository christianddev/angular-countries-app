import { Country } from "./country.interface"
import { Region } from "./region.type"

export interface CacheStoreItem {
  searchTerm: string | Region
  countries: Country[]
}

export interface CacheStore {
  byCapital: CacheStoreItem
  byCountry: CacheStoreItem
  byRegion: CacheStoreItem
}

