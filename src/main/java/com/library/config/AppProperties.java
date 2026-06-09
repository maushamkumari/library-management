package com.library.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "library")
public class AppProperties {

    private final Fine fine = new Fine();
    private final Issue issue = new Issue();

    public Fine getFine() {
        return fine;
    }

    public Issue getIssue() {
        return issue;
    }

    public static class Fine {
        private int freeDays = 7;
        private double amountPerDay = 5;

        public int getFreeDays() {
            return freeDays;
        }

        public void setFreeDays(int freeDays) {
            this.freeDays = freeDays;
        }

        public double getAmountPerDay() {
            return amountPerDay;
        }

        public void setAmountPerDay(double amountPerDay) {
            this.amountPerDay = amountPerDay;
        }
    }

    public static class Issue {
        private int maxBooksPerStudent = 5;

        public int getMaxBooksPerStudent() {
            return maxBooksPerStudent;
        }

        public void setMaxBooksPerStudent(int maxBooksPerStudent) {
            this.maxBooksPerStudent = maxBooksPerStudent;
        }
    }
}
