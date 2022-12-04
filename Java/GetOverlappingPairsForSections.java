package Java;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * GetOverlappingPairsForSections
 */
public class GetOverlappingPairsForSections {
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

    // Get range for given sections
    private static int[] getRangeForGivenAssignment(String assignment) {
        String[] sectionRange = assignment.split("-");
        return Arrays.stream(sectionRange).mapToInt(Integer::parseInt).toArray();  
    }

    // Get overlapping pairs for given inputs - fully contains another range
    private static int getOverLappingPairs(String assignment1, String assignment2) {
        int[] indexForAssignment1 = getRangeForGivenAssignment(assignment1);
        int[] indexForAssignment2 = getRangeForGivenAssignment(assignment2);
        int startSectionAssign1 = indexForAssignment1[0];
        int endSectionAssign1 = indexForAssignment1[1];
        int startSectionAssign2 = indexForAssignment2[0];
        int endSectionAssign2 = indexForAssignment2[1];
        if (
            (startSectionAssign1 <= startSectionAssign2 &&
            startSectionAssign2 <= endSectionAssign1 &&
            startSectionAssign1 <= endSectionAssign2 &&
            endSectionAssign2 <= endSectionAssign1) ||
            (startSectionAssign2 <= startSectionAssign1 &&
            startSectionAssign1 <= endSectionAssign2 &&
            startSectionAssign2 <= endSectionAssign1 &&
            endSectionAssign1 <= endSectionAssign2)
        ) {
            return 1;
        }
        return 0;
    }

    // Get overlapping pairs for given inputs - fully contains another range
    private static int getOverLappingPairsForRange(String assignment1, String assignment2) {
        int[] indexForAssignment1 = getRangeForGivenAssignment(assignment1);
        int[] indexForAssignment2 = getRangeForGivenAssignment(assignment2);
        int startSectionAssign1 = indexForAssignment1[0];
        int endSectionAssign1 = indexForAssignment1[1];
        int startSectionAssign2 = indexForAssignment2[0];
        int endSectionAssign2 = indexForAssignment2[1];
        if (
            (startSectionAssign1 <= startSectionAssign2 &&
            startSectionAssign2 <= endSectionAssign1 ||
            startSectionAssign1 <= endSectionAssign2 &&
            endSectionAssign2 <= endSectionAssign1) ||
            (startSectionAssign2 <= startSectionAssign1 &&
            startSectionAssign1 <= endSectionAssign2 ||
            startSectionAssign2 <= endSectionAssign1 &&
            endSectionAssign1 <= endSectionAssign2)
        ) {
            return 1;
        }
        return 0;
    }

    public static void main(String[] args) {
        try{
            FileReader fileReader = new FileReader("./inputs.txt");
            BufferedReader bufferedReader = new BufferedReader(fileReader);
            List<String> inputs = getInputFromFile(bufferedReader);

            int overlappingPairsCount = 0;
            for(int i = 0; i < inputs.size(); i++){
                String input = inputs.get(i);
                String[] pairs = input.split(",");
                if(getOverLappingPairs(pairs[0], pairs[1]) > 0){
                    overlappingPairsCount++;
                }
            }
            System.out.println(overlappingPairsCount);

            int overlappingPairsCountForRange = 0;
            for(int i = 0; i < inputs.size(); i++){
                String input = inputs.get(i);
                String[] pairs = input.split(",");
                if(getOverLappingPairsForRange(pairs[0], pairs[1]) > 0){
                    overlappingPairsCountForRange++;
                }
            }
            System.out.println(overlappingPairsCountForRange);
        } catch (FileNotFoundException fileNotFoundException){
            System.out.println(fileNotFoundException.getMessage());
        }
    }
}