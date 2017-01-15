import React, { PropTypes } from 'react'
import { formatTimezone, inningSuffix } from 'helpers/utils'
import { gameStateContainer, gameState } from './styles.css'


export default function GameState({ state, status, time, prds, currentPrd, currentTime, totalPrds, ordinal, isPlayoffs }) {
  return (
    <div className={gameStateContainer}>
      { state === 0 && <span>{time}</span> }
      { state === 1 && <span>{`${currentTime} • ${currentPrd}`}<sup>{inningSuffix(String(currentPrd))}</sup></span> }
      { state === 2 && <span>{currentPrd > prds ? `${status}/${ordinal}` : status}</span> }
    </div>
  )
}


function MlbState({status, time, inning, inningState, outs, reason,
  description, doubleHdr, gameNbr}) {
  // all cases of pre-game statuses
  if (status === 'Preview' || status === 'Warmup' || status === 'Pre-Game' || status === 'Delayed Start') {
    return (
      <div className={gameInfo}>
        <span>{time.startsWith('3:33') ? 'TBA' : time}</span>
        <span><small>
          {description ? description : status === 'Pre-Game' || status === 'Delayed Start' ? status : null}
        </small></span>
      </div>
    )
  }
  // all cases of mid-game statuses
  else if (status === 'In Progress' || status === 'Delayed' || status === 'Suspended' || status === 'Review' || status === 'Manager Challenger') {
    const suffix = inningSuffix(inning)
    return (
      <div className={gameInfo}>
        <span>{`${inningState} ${inning}`}<sup>{suffix}</sup></span>
        <span><small>
          {status === 'In Progress' ? inningState === 'Middle' || inningState === 'End' ? outs = '' : outs === '1' ? `${outs} out` : `${outs} outs` : null}
          {status === 'Manager Challenge' ? status : status !== 'In Progress' ? `${status} (${reason})` : null}
        </small></span>
      </div>
    )
  }
  // all cases of post-game statuses
  else if (status === 'Final' || status === 'Game Over' || status === 'Completed Early' || status === 'Postponed') {
    return (
      <div className={gameInfo}>
        <span>{status === 'Postponed' ? status : inning !== '9' ? `Final/${inning}` : 'Final'}</span>
        <span><small>
          {status === 'Postponed' ? `(${reason})` : doubleHdr === 'S' || doubleHdr === 'Y' ? `Game ${gameNbr} of 2` : status === 'Completed Early' ? status : null}
        </small></span>
      </div>
    )
  }
  // mlb has so many different status options, this is to find any new ones and add them
  else {
    return (
      <div className={gameInfo}>
        <span>{'fix this bug..'}</span>
      </div>
    )
  }
}









































//
// function NbaState({status, totalQtrs, playoffs}) {
//   // all cases of pre-game statuses. this checks if string starts w/ number
//   if (!(isNaN(Number(status.charAt(0))))) {
//     return (
//       <div className={gameInfo}>
//         <span>{status.toUpperCase()}</span>
//       </div>
//     )
//   }
//   // DON'T KNOW BC SEASON HASN'T STARTED
//   // all cases of mid-game statuses
//   // else if () {
//   //   return (
//   //
//   //   )
//   // }
//   // all cases of post-game statuses
//   else if (status === 'Final') {
//     const OTs = totalQtrs - 4
//     return (
//       <div className={gameInfo}>
//         <span>{totalQtrs > 4 ? OTs > 1 ? `${status}/${OTs}OT` : `${status}/OT` : status}</span>
//         {playoffs ? <span><small>{`Game ${playoffs.game_number} of 7`}</small></span> : null}
//       </div>
//
//     )
//   }
// }
//
// function NhlState({status, time, prd, totalPrds, ordinal, playoffs}) {
//   // all cases of pre-game statuses
//   if (status === 'Preview') {
//     const timeEt = formatTz(time)
//     return (
//       <div className={gameInfo}>
//         <span>{`${timeEt} ET`}</span>
//       </div>
//     )
//   }
//   // DON'T KNOW BC SEASON HASN'T STARTED
//   // all cases of mid-game statuses
//   // else if () {
//   //   return (
//   //
//   //   )
//   // }
//   // all cases of post-game statuses
//   else if (status === 'Final') {
//     return (
//       <div className={gameInfo}>
//         <span>{totalPrds - 3 > 0 ? `${status}/${ordinal}` : status}</span>
//         <span><small>{playoffs ? `${playoffs.gameLabel} of 7` : null}</small></span>
//       </div>
//
//     )
//   }
// }
