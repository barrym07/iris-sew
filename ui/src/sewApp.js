import { RfEnvironment } from './RfEnvironment';
import { io } from 'socket.io-client';
import { satellites, antennas, teams } from './constants';

// Create a sync global context for the RF Environments
const sewApp = {
  teamInfo: {
    team: 'Persephone',
    server: '',
  },
  init: () => {
    window.sewApp.socketInit(window.sewApp.socket);
  },
  constants: {
    satellites,
    antennas,
    teams,
  },
  environment: new RfEnvironment(),
  socket: io('http://localhost:8080', { transports: ['websocket'] }),

  /**
   *
   * @param {Socket} socket
   */

  // watch window.sewApp.environment variable with useUpdateSignals

  socketInit: socket => {
    socket.on('connect', () => {
      console.log('Connected to the server');
      window.sewApp.teamInfo = {
        team: 'blue',
        server: 'Connected',
      };

      socket.emit('updateTeam', { team: sewApp.team });

      socket.on('updateSignals', update => {
        window.sewApp.environment.updateSignals(update);
        console.log('updateSignals received', update);
        for (let i = 1; i <= 4; i++) {
          const specA = window.sewApp.getSpectrumAnalyzer(i);
          specA.signals = specA.signals.filter(signal => {
            return signal.team !== update.team;
          });
          window.sewApp.environment.signals.forEach(signal => {
            specA.signals.push({
              team: update.team,
              freq: signal.frequency * 1e6,
              amp: signal.power,
              bw: signal.bandwidth * 1e6,
              target_id: signal.target_id,
            });
          });
        }
      });
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });

    socket.connect();
  },
  getSpectrumAnalyzer: i => {
    console.log(window.sewApp.specA1);
    if (i === 1) return window.sewApp.specA1;
    if (i === 2) return window.sewApp.specA2;
    if (i === 3) return window.sewApp.specA3;
    if (i === 4) return window.sewApp.specA4;
  },
};

window.sewApp = sewApp;
