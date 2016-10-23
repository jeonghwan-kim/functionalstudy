module.exports.captureStream = (stream) => {
  const oldWrite = stream.write;
  let   buf = '';

  stream.write = chunk => buf += chunk.toString();

  return {
    unhook() { stream.write = oldWrite; },
    captured() { return buf; }
  }
};

