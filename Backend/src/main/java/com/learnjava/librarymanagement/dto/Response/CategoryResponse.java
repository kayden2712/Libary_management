package com.learnjava.librarymanagement.dto.Response;

import com.learnjava.librarymanagement.entity.Area;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CategoryResponse {
    private Long id;
    private String category_name;
    private Area area;
}