import { generate } from "rxjs";
import { Timestamp } from "./timestamp.schema";

/**
 * Location collection is used to store geographical, organizational,
 * and network location data such as region hierarchy, coordinates,
 * source system mapping, and cell site information.
 *
 * @property { string } code - Unique location code
 * @property { string } data_source - Source system (BOTH | LACIMA | Telkomsel)
 * @property { string[] } adhoc_group - Related adhoc group location identifiers
 * @property { string } name - Location name
 * @property { string } type - Location type reference (LOV)
 * @property { string } parent - Parent location identifier
 * @property { number } lac - Location Area Code
 * @property { number } cell_id - Cell identifier
 * @property { string } longitude - Longitude coordinate
 * @property { string } latitude - Latitude coordinate
 * @property { string } area - Area name
 * @property { string } prov - Province name
 * @property { string } region - Region name
 * @property { string } city - City name
 * @property { string } [area_id] - Area identifier
 * @property { string } [prov_id] - Province identifier
 * @property { string } [region_id] - Region identifier
 * @property { string } [city_id] - City identifier
 * @property { string } status - Location status
 * @property { string } timezone - Timezone value
 * @property { string[] } [region_detail] - Region detail hierarchy
 * @property { string[] } [prov_detail] - Province detail hierarchy
 * @property { string[] } [city_detail] - City detail hierarchy
 * @property { string|null } [created_by] - Creator account identifier
 */
export class Location extends Timestamp {
  code!: string
  data_source!: string // BOTH | LACIMA | Telkomsel
  adhoc_group: string[] = []; // Location[]
  name!: string;
  type!: string // Lov
  parent!: string // Location
  lac!: number
  cell_id!: number
  longitude!: string
  latitude!: string
  area!: string
  prov!: string
  region!: string
  city!: string
  area_id?: string
  prov_id?: string
  region_id?: string
  city_id?: string
  status!: string
  timezone!: string
  region_detail?: string[]
  prov_detai?: string[]
  city_detail?: string[]
  created_by?: string // Account

  static create(data: Partial<Location>) {
    return Object.assign(new Location(), data)
  }
}