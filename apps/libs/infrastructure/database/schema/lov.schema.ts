/**
 * LOV (List of value) collection is used to store interface component
 * Mostly is used to define value for front-end need like dropdown item list etc
 *
 * @property { string } group_name - Used to group LOV into a group
 * @property { any } set_value - Store the value of a LOV
 * @property { string } description - Desc of LOV
 * @property { any | object } additional - Extra value store
 */
export class LOV {
  group_name: string
  set_value: any
  description: string
  additional: object | any
}
