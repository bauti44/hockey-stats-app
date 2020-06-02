export function importPlayers(fetchMatchesPlayers) {
    fetchMatchesPlayers().then(response => {
      if (response.success) {
        let playerAgreggatedList = []
        if (response.data.length > 0) {
          response.data.forEach(matchPlayersItem => {
            playerAgreggatedList.push(...matchPlayersItem.playerList)
          });
          return Array.from(new Set(playerAgreggatedList))
        }
      }
    })
  }