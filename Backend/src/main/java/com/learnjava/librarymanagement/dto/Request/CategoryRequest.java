package com.learnjava.librarymanagement.dto.Request;

import com.learnjava.librarymanagement.entity.Area;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CategoryRequest {
    private long category_id;
    private String category_name;
    private Area area;
}
