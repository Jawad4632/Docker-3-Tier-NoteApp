package com.notepad.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class Note {
    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private String text;

    public Note() {}

    public Note(String title, String text) {
        this.title = title;
        this.text = text;
    }

}