def main():
    print("====================================")
    print("   MONTGOMERY ARMS INVENTORY TOOL   ")
    print("====================================")
    
    item_name = input("Enter item name: ")
    quantity = int(input(f"Enter quantity for {item_name}: "))
    price = float(input(f"Enter price per unit ($): "))
    
    total_value = quantity * price
    
    print("\n--- Summary ---")
    print(f"Item: {item_name}")
    print(f"Total Stock Value: ${total_value:,.2f}")

if __name__ == "__main__":
    main()