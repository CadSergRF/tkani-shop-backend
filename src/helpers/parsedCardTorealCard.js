export const ParsedToReal = (data) => {
  const realCard = {};
  const characteristic = {}
  const seoTags = {};
  realCard.articul = data.articul;
  realCard.name = data.name;
  realCard.price = data.price;
  realCard.oldPrice = data.oldPrice || 0;
  realCard.quantity = data.quantity || 0;
  realCard.picture = '';
  realCard.description = data.description || '';
  characteristic.width = data.characteristic_width || 0;
  characteristic.picture = data.characteristic_picture || '';
  characteristic.color = data.characteristic_color || '';
  characteristic.counryOfOrigin = data.characteristic_counryOfOrigin || '';
  characteristic.composition = data.characteristic_composition || ''
  characteristic.weight = data.characteristic_weight || 0;
  seoTags.header = data.seoTags_header || '';
  seoTags.description = data.seoTags_description || '';
  seoTags.keyWords = data.seoTags_keyWords || '';

  realCard.characteristic = characteristic;
  realCard.seoTags = seoTags

  return realCard
}