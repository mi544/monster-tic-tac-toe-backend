/** Creates an empty 3T board
 *
 * @return {array} - empty 3T board
 */
const getBoard = () => [
  [
    { position: '00', value: null },
    { position: '01', value: null },
    { position: '02', value: null },
  ],
  [
    { position: '10', value: null },
    { position: '11', value: null },
    { position: '12', value: null },
  ],
  [
    { position: '20', value: null },
    { position: '21', value: null },
    { position: '22', value: null },
  ],
]

module.exports = { getBoard }
