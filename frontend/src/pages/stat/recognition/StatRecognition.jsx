
const STAT_RECOGNITION_MAP =
{
  'salida':'st',
  'bloqueo':'bl',
  'presion':'bl',
  'perdida':'lost',
  'perdio':'lost',
  'error':'lost',
  'recupero':'rec',
  'recuperacion':'rec',
  'quite':'rec',
  'infracción':'fault',
  'falta':'fault',
  'veinticinco': 'eyrd',
  '25': 'eyrd',
  'yardas': 'eyrd',
  'área': 'earea',
  'tiro': 'sht',
  'arco': 'sht',
  'corner': 'pc',
  'corto': 'pc',
  'gol': 'g',
  'penal': 'ps',
  'izquierda': 'l',
  'izquierdo': 'l',
  'centro': 'c',
  'central': 'c',
  'derecha': 'd',
  'derecho': 'd',
  'chica': 'smll',
  'chico': 'smll',
}

class StatRecognition {
    getKeywords() {
        return Object.keys(STAT_RECOGNITION_MAP)
    }
}

export default StatRecognition;