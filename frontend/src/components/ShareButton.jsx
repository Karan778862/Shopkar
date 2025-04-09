import { useState } from "react";
import { Share2 } from "lucide-react";

export default function ShareButton({ product }) {
  const [showMenu, setShowMenu] = useState(false);

  if (!product || !product._id) {
    return null; // safety check
  }

  const url = `${window.location.origin}/product/${product._id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url)
      .then(() => alert("Link copied to clipboard!"))
      .catch(() => alert("Failed to copy link"));
  };

  const handleWhatsAppShare = () => {
    const msg = `Check out this product: ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleFacebookShare = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(fbUrl, "_blank");
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowMenu(prev => !prev);
        }}
        className="p-2 rounded-full hover:bg-gray-100"
      >
        <Share2 className="w-5 h-5" />
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <button onClick={handleCopyLink} className="block w-full px-4 py-2 text-left hover:bg-gray-100">📋 Copy Link</button>
          <button onClick={handleWhatsAppShare} className="block w-full px-4 py-2 text-left hover:bg-gray-100">🟢 WhatsApp</button>
          <button onClick={handleFacebookShare} className="block w-full px-4 py-2 text-left hover:bg-gray-100">📘 Facebook</button>
        </div>
      )}
    </div>
  );
}
