const CONSTANTS = {
  ALL_MATCHES: 'all',
  RIVAL: 'RIVAL',
  EMPTY_PLAYERS: '',
  TIMEOUT: 100,
  LONG_TIMEOUT: 1000,
  SHOW_SUCCESS_FLAG: 'showSuccess',
  FIELD: 'field',
  AREA: 'area',
  GOAL: 'g'
}

const STAT_MAP =
{
  'st': 'Salida',
  'bl': 'Bloqueo',
  'lost': 'Perdida',
  'rec': 'Recupero',
  'fault': 'Infracción',
  'eyrd': 'Ingreso 25',
  'earea': 'Ingreso area',
  'sht': 'Tiro al arco',
  'pc': 'Corner corto',
  'g': 'Gol',
  'ps': 'Penal'
}

export {CONSTANTS, STAT_MAP};
