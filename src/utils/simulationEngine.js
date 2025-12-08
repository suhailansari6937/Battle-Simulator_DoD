
// =============================
// DISTANCE HELPERS
// =============================
// Manhattan distance (for melee range = 1)
function manhattan(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}
// Chebyshev distance (for ranged units)
function chebyshev(a, b) {
  return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
}
// find nearest enemy
export function findNearest(unit, enemies) {
  if (!enemies.length) return null;
  let best = enemies[0];
  let bestD = chebyshev(unit, best);
  for (let e of enemies) {
    const d = chebyshev(unit, e);
    if (d < bestD) {
      bestD = d;
      best = e;
    }
  }
  return best;
}
// =============================
// RANGE CHECK
// =============================
export function inRange(attacker, target, unitDefs) {
  const def = unitDefs[attacker.type];
  if (!def) return false;
  // melee: ONLY hit orthogonally
  if (def.range === 1) {
    return manhattan(attacker, target) === 1;
  }
  // ranged: diagonal allowed
  return chebyshev(attacker, target) <= def.range;
}
// =============================
// ATTACK
// =============================
export function attack(attacker, target, unitDefs) {
  const def = unitDefs[attacker.type];
  if (!def) return;
  const dmg = def.atk;
  target.hp -= dmg;
  if (target.hp < 0) target.hp = 0;
  if (attacker.stats) attacker.stats.damage += dmg;
}
// =============================
// MOVEMENT
// =============================
export function moveTowards(unit, target, gridSize, allUnits) {
  let dx = Math.sign(target.x - unit.x);
  let dy = Math.sign(target.y - unit.y);
  const tryMove = (nx, ny) => {
    if (nx < 0 || nx >= gridSize || ny < 0 || ny >= gridSize) return false;
    const blocked = allUnits.some(
      (u) => u !== unit && u.hp > 0 && u.x === nx && u.y === ny
    );
    if (blocked) return false;
    unit.x = nx;
    unit.y = ny;
    if (unit.stats) unit.stats.moves += 1;
    return true;
  };
  // try full diagonal step first
  if (dx !== 0 && dy !== 0) {
    if (tryMove(unit.x + dx, unit.y + dy)) return;
  }
  // try horizontal only
  if (dx !== 0) {
    if (tryMove(unit.x + dx, unit.y)) return;
  }
  // try vertical only
  if (dy !== 0) {
    if (tryMove(unit.x, unit.y + dy)) return;
  }
  // can't move → frozen until enemy moves around
}

