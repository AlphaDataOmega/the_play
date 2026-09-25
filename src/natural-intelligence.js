const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

export const Universe = Object.freeze({
  mapUniverse(names) {
    if (!Array.isArray(names) || names.length === 0) {
      throw new TypeError("Universe needs at least one named body.");
    }
    return names.map((name, index) => {
      const radius = Math.sqrt(index + 1);
      const angle = index * GOLDEN_ANGLE;
      return {
        name,
        index,
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle)
      };
    });
  }
});

export const Toe = Object.freeze({
  touchCurrentPosition(point) {
    if (!point) return { verdict: "no-contact", text: "" };
    return {
      verdict: "contact",
      character: point.name,
      text: `${point.name} touches (${point.x.toFixed(3)}, ${point.y.toFixed(3)})`
    };
  }
});

export const Carbon = Object.freeze({
  makeCarbonBonds(points) {
    const bonds = [];
    for (let i = 1; i < points.length; i += 1) {
      let nearest = points[0];
      let nearestDistance = distance(points[i], nearest);
      for (let j = 1; j < i; j += 1) {
        const candidateDistance = distance(points[i], points[j]);
        if (candidateDistance < nearestDistance) {
          nearest = points[j];
          nearestDistance = candidateDistance;
        }
      }
      bonds.push({
        from: nearest.name,
        to: points[i].name,
        distance: Number(nearestDistance.toFixed(4))
      });
    }
    return bonds;
  }
});

export const Snake = Object.freeze({
  walkSnakePath(points, bonds, startName = points[0]?.name) {
    const names = new Set(points.map(p => p.name));
    if (!names.has(startName)) throw new Error(`Unknown starting place: ${startName}`);

    const neighbors = new Map([...names].map(name => [name, []]));
    for (const bond of bonds) {
      if (!names.has(bond.from) || !names.has(bond.to)) {
        throw new Error("Snake found a bond outside the Universe.");
      }
      neighbors.get(bond.from).push(bond.to);
      neighbors.get(bond.to).push(bond.from);
    }
    for (const list of neighbors.values()) list.sort();

    const path = [];
    const visited = new Set();
    const stack = [startName];
    while (stack.length) {
      const here = stack.pop();
      if (visited.has(here)) continue;
      visited.add(here);
      path.push(here);
      for (const next of [...neighbors.get(here)].reverse()) {
        if (!visited.has(next)) stack.push(next);
      }
    }
    return path;
  }
});

export const Null = Object.freeze({
  holdOpenChoice(leftPressure, rightPressure, tolerance = 0.05) {
    const residual = leftPressure - rightPressure;
    if (Math.abs(residual) <= tolerance) {
      return { verdict: "held-open", residual };
    }
    return {
      verdict: "commit",
      direction: residual > 0 ? "left" : "right",
      residual
    };
  }
});

export const Witness = Object.freeze({
  answerOnlyFromRecord(phrase, record) {
    const query = phrase.trim().toLocaleLowerCase("en-US");
    if (!query) return { verdict: "refuse", text: "" };

    const exactOrder = record.find(line =>
      line.toLocaleLowerCase("en-US").includes(query)
    );
    if (exactOrder) return { verdict: "held-in-order", text: exactOrder };

    const words = query.split(/\s+/).sort().join(" ");
    const familiarDifferentOrder = record.find(line => {
      const normalized = line.toLocaleLowerCase("en-US")
        .replace(/[^a-z0-9\s]/g, "")
        .trim()
        .split(/\s+/)
        .sort()
        .join(" ");
      return normalized === words;
    });
    if (familiarDifferentOrder) {
      return { verdict: "known-words-different-order", text: "" };
    }
    return { verdict: "refuse", text: "" };
  }
});

export function performNaturalIntelligence({ characterNames, record }) {
  const universeMap = Universe.mapUniverse(characterNames);
  const carbonBonds = Carbon.makeCarbonBonds(universeMap);
  const snakePath = Snake.walkSnakePath(universeMap, carbonBonds);
  const points = new Map(universeMap.map(point => [point.name, point]));
  const toeContacts = snakePath.map(name => Toe.touchCurrentPosition(points.get(name)));
  return { universeMap, carbonBonds, snakePath, toeContacts, record };
}

export function renderUniverseAsSvg(points, bonds, size = 720) {
  const center = size / 2;
  const scale = size / 9;
  const byName = new Map(points.map(p => [p.name, p]));
  const escape = s => String(s).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  const lines = bonds.map(b => {
    const a = byName.get(b.from), c = byName.get(b.to);
    return `<line x1="${center + a.x * scale}" y1="${center + a.y * scale}" x2="${center + c.x * scale}" y2="${center + c.y * scale}" stroke="currentColor" stroke-opacity=".35"/>`;
  });
  const nodes = points.flatMap(p => {
    const x = center + p.x * scale, y = center + p.y * scale;
    return [
      `<circle cx="${x}" cy="${y}" r="7" fill="currentColor"/>`,
      `<text x="${x + 12}" y="${y + 5}" font-family="monospace" font-size="16">${escape(p.name)}</text>`
    ];
  });
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" role="img" aria-label="Natural Intelligence universe">`,
    ...lines, ...nodes, "</svg>"
  ].join("\n");
}
