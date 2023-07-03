import cluster from 'cluster';
import os from 'os';

if (cluster.isPrimary) {
  for (let i = 0; i < os.cpus().length - 1; i++) {
    cluster.fork({ PORT: +(process.env.PORT || 4000) + 1 + i });
  }
}

if (cluster.isWorker) {
  require('./index.ts');
}
