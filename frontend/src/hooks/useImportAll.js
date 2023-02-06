function importAll(r) {
  return r.keys().map(r);
}

export default function useImages() {
  return importAll(require.context('../assets/images/characters', false, /\.(png|jpe?g|svg)$/));
}
