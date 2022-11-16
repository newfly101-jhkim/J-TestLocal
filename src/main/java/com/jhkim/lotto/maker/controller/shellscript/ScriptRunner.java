package com.jhkim.lotto.maker.controller.shellscript;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class ScriptRunner {
    public void runScript() {
        try {
            Process process = Runtime.getRuntime().exec("G:/kr.jhkim.lotto.maker/src/main/java/com/jhkim/lotto/maker/controller/shellscript/echoThisDate.bat");

            // Read output
            StringBuilder output = new StringBuilder();
            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream()));

            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line);
            }

            System.out.println(output.toString());

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public Map<Integer, String> execCommand(String... str) {
        Map<Integer, String> map = new HashMap<>();
        ProcessBuilder processBuilder = new ProcessBuilder(str);
        processBuilder.redirectErrorStream(true);
        Process process = null;

        try {
            process = processBuilder.start();
        } catch (IOException error) {
            error.printStackTrace();
        }

        BufferedReader reader = null;
        if (process != null) {
            reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        }

        String line;
        StringBuilder stringBuilder = new StringBuilder();
        try {
            if (reader != null) {
                while ((line = reader.readLine()) != null) {
                    stringBuilder.append(line).append("\n");
                }
            }
        } catch (IOException error) {
            error.printStackTrace();
        }

        try {
            if (process != null) {
                process.waitFor();
            }
        } catch (InterruptedException error) {
            error.printStackTrace();
        }

        if (process != null) {
            map.put(0, String.valueOf(process.exitValue()));
        }
        try {
            map.put(1, stringBuilder.toString());
        } catch (StringIndexOutOfBoundsException error) {
            if(stringBuilder.toString().length() == 0) {
                return map;
            }
        }

        return map;
    }
}
