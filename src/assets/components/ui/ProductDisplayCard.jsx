export default function ProductDisplayCard({ product, addToCart, addedItems }) {
  const isAdded = addedItems.includes(product.id);
  return (
    <div className="product-card">
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <p className="product-category">
        {product.category
          .replace("-", " ")
          .replace(/\b\w/g, (l) => l.toUpperCase())}
      </p>
      <p className="product-price">${product.price}</p>
      {product.discountPercentage > 0 && (
        <span className="discount">
          -{Math.round(product.discountPercentage)}%
        </span>
      )}
      <button
        onClick={() => addToCart(product)}
        className={isAdded ? "add-to-cart-btn added" : "add-to-cart-btn"}
        disabled={isAdded}
      >
        {isAdded ? "Added to Cart" : "Add to Cart"}
      </button>
    </div>
  );
}