const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..', '..');

/**
 * Returns an array of renderer names.
 *
 * @returns {string[]} Array of renderer names.
 */
const getRenderers = () => {
  // Path to root renderer directory.
  const rendererPath = path.resolve(PROJECT_ROOT, 'src', 'renderer');

  /**
   * Determines if a renderer with the given name exists.
   *
   * @param {string} name - Name of renderer for which to check existence.
   *
   * @returns {boolean} True if renderer exists, false otherwise.
   */
  const rendererExists = (name) => {
    const rendererIndex = path.resolve(rendererPath, name, 'index.js');
    return fs.existsSync(rendererIndex);
  };

  if (fs.existsSync(rendererPath)) {
    return fs
      .readdirSync(rendererPath, { withFileTypes: true })
      .filter((dirent) => { return dirent.isDirectory(); })
      .map((dirent) => { return dirent.name; })
      .filter((name) => { return name.charAt(0) !== '_'; })
      .filter((name) => { return rendererExists(name) });
  }

  return [];
};

module.exports = {
  getRenderers,
};
