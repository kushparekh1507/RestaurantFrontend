import React, { useState } from "react";
import {
  Trash2,
  Plus,
  Minus,
  MessageSquare,
  Send,
  AlertTriangle,
} from "lucide-react";

export const CurrentOrder = ({
  order,
  tableSelected,
  onUpdateQuantity,
  onUpdateNotes,
  onSubmitOrder,
}) => {
  const [editingNotes, setEditingNotes] = useState("");
  const [itemNotes, setItemNotes] = useState("");

  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSaveNotes = (itemId) => {
    onUpdateNotes(itemId, itemNotes);
    setEditingNotes(null);
    setItemNotes("");
  };

  const handleEditNotes = (itemId, currentNotes = "") => {
    setEditingNotes(itemId);
    setItemNotes(currentNotes);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Current Order</h2>
        {order.tableNumber ? (
          <p className="text-sm text-gray-600">Table #{order.tableNumber}</p>
        ) : (
          <p className="text-sm text-orange-600 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-1" />
            No table selected
          </p>
        )}
      </div>

      <div className="flex-grow overflow-y-auto p-4">
        {order.items.length > 0 ? (
          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item.menuItemId}
                className="border border-gray-200 rounded-lg p-3"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">
                      {item.itemName}
                    </h3>
                    <p className="text-sm text-orange-600">
                      ₹{item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.menuItemId, item.quantity - 1)
                      }
                      className="h-6 w-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
                    >
                      <Minus className="h-3 w-3" />
                    </button>

                    <span className="w-6 text-center font-medium">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        onUpdateQuantity(item.menuItemId, item.quantity + 1)
                      }
                      className="h-6 w-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {editingNotes === item.menuItemId ? (
                  <div className="mt-2">
                    <textarea
                      value={itemNotes}
                      onChange={(e) => setItemNotes(e.target.value)}
                      className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Add special instructions..."
                      rows={2}
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        onClick={() => setEditingNotes(null)}
                        className="text-sm text-gray-600 hover:text-gray-800 mr-3"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveNotes(item.menuItemId)}
                        className="text-sm bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-2 flex justify-between items-center">
                    {item.notes ? (
                      <div className="text-xs text-gray-600 bg-gray-50 p-1.5 rounded flex-1 mr-2">
                        {item.notes}
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEditNotes(item.menuItemId)}
                        className="text-xs flex items-center text-gray-500 hover:text-orange-500"
                      >
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Add note
                      </button>
                    )}

                    <div className="flex space-x-2">
                      {item.notes && (
                        <button
                          onClick={() =>
                            handleEditNotes(item.menuItemId, item.notes)
                          }
                          className="text-xs text-blue-600 hover:text-blue-700"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => onUpdateQuantity(item.menuItemId, 0)}
                        className="text-xs text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No items added</p>
            <p className="text-sm mt-1">Select a table and add menu items</p>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Subtotal ({totalItems} items)</span>
          <span className="font-medium">₹{subtotal.toFixed(2)}</span>
        </div>

        <button
          onClick={onSubmitOrder}
          disabled={!tableSelected || order.items.length === 0}
          className={`
            w-full py-3 rounded-lg flex items-center justify-center space-x-2
            ${
              !tableSelected || order.items.length === 0
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }
          `}
        >
          <Send className="h-4 w-4" />
          <span>Submit Order</span>
        </button>
      </div>
    </div>
  );
};
