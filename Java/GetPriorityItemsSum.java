package Java;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * GetPriorityItemsSum
 */
public class GetPriorityItemsSum {

    private static List<String> getInputFromFile(BufferedReader bufferedReader){
        List<String> inputs = new ArrayList<>();
        String input = null;
        try{
            while(true){
                input = bufferedReader.readLine();
                if(input == null){
                    break;
                }
                inputs.add(input);
            }
        } catch(IOException ioException){
            System.out.println(ioException.getMessage());
        }
        return inputs;
    }
    // Generate priority mapping for lowercase and uppercase items
    private static Map<String, Integer> generatePriorityMapping(List<String> inputs){
        Map<String, Integer> map = new HashMap<>();
        int startPointLowerCase = (int) 'a';
        int startPointUpperCase = (int) 'A';
        for (int i = 0; i < 26; i++) {
            String character = String.valueOf((char)(i + startPointLowerCase));
            map.put(character, i + 1);
          }
          for (int i = 0; i < 26; i++) {
            String character = String.valueOf((char)(i + startPointUpperCase));
            map.put(character, i + 27);
          }
        return map;
    }

    // Filter string to remove repeated items
    private static String getFilteredItems(String input){
        Set<String> filteredString = new HashSet<>();
        for(int i = 0; i < input.length(); i++){
            filteredString.add(input.substring(i, i+1));
        }
        String[] filteredItems = filteredString
        .toArray(new String[filteredString.size()]);
        return String.join("", filteredItems);
    }

    /*
        Takes a list of string and map (priority map) as inputs.
        1. Filters the input array by removing repeated occurences in each of the input
        and gets the final added string for the input array
        2. Iterates through the filtered string and obtains item (the mismatched item
        occurs twice in the filtered string)
        3. Gets the priority for the item and returns the count
    */  
    private static int getTypeAndPriorityForRuckSack(
        String[] inputs, Map<String, Integer> priorityMap){
            Map<String, Integer> rucksackItems = new HashMap<>();
          
            String filteredItemsList = "";
            String priorityItem = "";
            int maxCountOfItem = 0;
          
            for (int i = 0; i < inputs.length; i++) {
              String filteredItems = getFilteredItems(inputs[i]);
              filteredItemsList += filteredItems;
            }
          
            for (int i = 0; i < filteredItemsList.length(); i++) {
              String item = filteredItemsList.substring(i,i+1);
              if (rucksackItems.containsKey(item)) {
                int count = rucksackItems.get(item);
                rucksackItems.put(item, count + 1);
              } else {
                rucksackItems.put(item, 1);
              }
            }
          
            for (String key: rucksackItems.keySet()) {
              int value = rucksackItems.get(key);
              if (value > maxCountOfItem) {
                priorityItem = key;
                maxCountOfItem = value;
              }
            }
            return priorityMap.get(priorityItem);
    }

    public static void main(String[] args) {
        try{
            FileReader fileReader = new FileReader("./inputs.txt");
            BufferedReader bufferedReader = new BufferedReader(fileReader);
            List<String> inputs = getInputFromFile(bufferedReader);
            Map<String, Integer> priorityMap = generatePriorityMapping(inputs);
  
            //   Get priority sum for individual items in the array          
            int priorityItemsSum = 0;
            for(int i = 0; i < inputs.size(); i++){
                String input = inputs.get(i);
                int compartmentLength = inputs.get(i).length()/2;
                String[] items = new String[]{
                    input.substring(0, compartmentLength),
                    input.substring(compartmentLength, input.length())
                };
                priorityItemsSum += getTypeAndPriorityForRuckSack(items, priorityMap);
            }
            System.out.println(priorityItemsSum);

            //   Get priority sum for a group of items in the array
            int priorityItemsSumForGroup = 0;
            for(int i = 0; i < inputs.size(); i += 3){
                String[] itemsArray = new String[]{
                    inputs.get(i),
                    inputs.get(i+1),
                    inputs.get(i+2)
                };
                priorityItemsSumForGroup += 
                getTypeAndPriorityForRuckSack(itemsArray, priorityMap);
            }
            System.out.println(priorityItemsSumForGroup);
        } catch(FileNotFoundException exception){
            System.out.println(exception.getMessage());
        }
    }
}